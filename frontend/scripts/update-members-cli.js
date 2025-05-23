#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { updateMembersFile, getMembersData } = require('./update-members');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Simple CLI for managing team members
 */
function startCLI() {
  console.log('\n===== Team Members Management =====\n');
  console.log('1. View all members');
  console.log('2. Add a new member');
  console.log('3. Edit a member');
  console.log('4. Delete a member');
  console.log('5. Exit');
  
  rl.question('\nSelect an option (1-5): ', (answer) => {
    switch(answer) {
      case '1':
        viewAllMembers();
        break;
      case '2':
        addNewMember();
        break;
      case '3':
        editMember();
        break;
      case '4':
        deleteMember();
        break;
      case '5':
        rl.close();
        console.log('\nExiting...\n');
        break;
      default:
        console.log('\nInvalid option. Please try again.\n');
        startCLI();
    }
  });
}

/**
 * View all members in the team
 */
function viewAllMembers() {
  const members = getMembersData();
  
  console.log('\n===== Current Team Members =====\n');
  
  if (members.length === 0) {
    console.log('No members found.');
  } else {
    members.forEach((member, index) => {
      console.log(`${index + 1}. ${member.name} - ${member.role}`);
    });
  }
  
  console.log('\n');
  continuePrompt();
}

/**
 * Add a new team member
 */
function addNewMember() {
  const members = getMembersData();
  const newMember = {
    id: String(members.length + 1),
    social_links: {}
  };
  
  console.log('\n===== Add New Member =====\n');
  
  rl.question('Name: ', (name) => {
    newMember.name = name;
    
    rl.question('Role: ', (role) => {
      newMember.role = role;
      
      rl.question('Bio: ', (bio) => {
        newMember.bio = bio;
        
        rl.question('Image URL: ', (imageUrl) => {
          newMember.image_url = imageUrl;
          
          rl.question('LinkedIn URL (optional): ', (linkedin) => {
            if (linkedin) newMember.social_links.linkedin = linkedin;
            
            rl.question('Twitter URL (optional): ', (twitter) => {
              if (twitter) newMember.social_links.twitter = twitter;
              
              rl.question('GitHub URL (optional): ', (github) => {
                if (github) newMember.social_links.github = github;
                
                members.push(newMember);
                updateMembersFile(members);
                
                console.log('\nNew member added successfully!\n');
                continuePrompt();
              });
            });
          });
        });
      });
    });
  });
}

/**
 * Edit an existing team member
 */
function editMember() {
  const members = getMembersData();
  
  console.log('\n===== Edit Member =====\n');
  
  if (members.length === 0) {
    console.log('No members found.');
    continuePrompt();
    return;
  }
  
  members.forEach((member, index) => {
    console.log(`${index + 1}. ${member.name} - ${member.role}`);
  });
  
  rl.question('\nSelect a member to edit (1-' + members.length + '): ', (answer) => {
    const index = parseInt(answer) - 1;
    
    if (isNaN(index) || index < 0 || index >= members.length) {
      console.log('\nInvalid selection. Please try again.\n');
      editMember();
      return;
    }
    
    const member = members[index];
    
    rl.question(`Name (${member.name}): `, (name) => {
      if (name) member.name = name;
      
      rl.question(`Role (${member.role}): `, (role) => {
        if (role) member.role = role;
        
        rl.question(`Bio (${member.bio}): `, (bio) => {
          if (bio) member.bio = bio;
          
          rl.question(`Image URL (${member.image_url}): `, (imageUrl) => {
            if (imageUrl) member.image_url = imageUrl;
            
            const linkedin = member.social_links.linkedin || '';
            rl.question(`LinkedIn URL (${linkedin}): `, (newLinkedin) => {
              if (newLinkedin) member.social_links.linkedin = newLinkedin;
              
              const twitter = member.social_links.twitter || '';
              rl.question(`Twitter URL (${twitter}): `, (newTwitter) => {
                if (newTwitter) member.social_links.twitter = newTwitter;
                
                const github = member.social_links.github || '';
                rl.question(`GitHub URL (${github}): `, (newGithub) => {
                  if (newGithub) member.social_links.github = newGithub;
                  
                  updateMembersFile(members);
                  
                  console.log('\nMember updated successfully!\n');
                  continuePrompt();
                });
              });
            });
          });
        });
      });
    });
  });
}

/**
 * Delete a team member
 */
function deleteMember() {
  const members = getMembersData();
  
  console.log('\n===== Delete Member =====\n');
  
  if (members.length === 0) {
    console.log('No members found.');
    continuePrompt();
    return;
  }
  
  members.forEach((member, index) => {
    console.log(`${index + 1}. ${member.name} - ${member.role}`);
  });
  
  rl.question('\nSelect a member to delete (1-' + members.length + '): ', (answer) => {
    const index = parseInt(answer) - 1;
    
    if (isNaN(index) || index < 0 || index >= members.length) {
      console.log('\nInvalid selection. Please try again.\n');
      deleteMember();
      return;
    }
    
    const member = members[index];
    
    rl.question(`Are you sure you want to delete ${member.name}? (y/n): `, (confirm) => {
      if (confirm.toLowerCase() === 'y') {
        members.splice(index, 1);
        updateMembersFile(members);
        
        console.log('\nMember deleted successfully!\n');
      } else {
        console.log('\nDeletion cancelled.\n');
      }
      
      continuePrompt();
    });
  });
}

/**
 * Continue prompt
 */
function continuePrompt() {
  rl.question('Press Enter to continue...', () => {
    startCLI();
  });
}

// Start the CLI
startCLI();
