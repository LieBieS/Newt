#!/usr/bin/env node
/**
 * Newt Plugin Validation Script
 * Validates plugin structure, configuration, and output contracts
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const PLUGIN_ROOT = path.join(__dirname, '..');
const ERRORS = [];
const WARNINGS = [];

// Validation functions
function validatePluginManifest() {
  console.log('Validating plugin manifest...');
  const manifestPath = path.join(PLUGIN_ROOT, '.claude-plugin', 'plugin.json');
  
  if (!fs.existsSync(manifestPath)) {
    ERRORS.push('Missing plugin.json manifest');
    return;
  }
  
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Required fields
    ['name', 'version', 'description', 'agents', 'commands', 'skills'].forEach(field => {
      if (!manifest[field]) {
        ERRORS.push(`Missing required field in manifest: ${field}`);
      }
    });
    
    // Validate arrays
    if (!Array.isArray(manifest.agents)) ERRORS.push('agents must be an array');
    if (!Array.isArray(manifest.commands)) ERRORS.push('commands must be an array');
    if (!Array.isArray(manifest.skills)) ERRORS.push('skills must be an array');
    
    console.log(`✓ Manifest valid (${manifest.agents.length} agents, ${manifest.commands.length} commands, ${manifest.skills.length} skills)`);
  } catch (err) {
    ERRORS.push(`Invalid JSON in plugin.json: ${err.message}`);
  }
}

function validateAgents() {
  console.log('Validating agents...');
  const agentsDir = path.join(PLUGIN_ROOT, 'agents');
  
  if (!fs.existsSync(agentsDir)) {
    ERRORS.push('Missing agents directory');
    return;
  }
  
  const agentFiles = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
  
  agentFiles.forEach(file => {
    const content = fs.readFileSync(path.join(agentsDir, file), 'utf8');
    
    // Check for required sections
    const requiredSections = ['Mission', 'Operating Procedure', 'Success Criteria'];
    requiredSections.forEach(section => {
      if (!content.includes(`## ${section}`)) {
        WARNINGS.push(`Agent ${file} missing section: ${section}`);
      }
    });
    
    // Check for error handling
    if (!content.includes('Error Handling') && !content.includes('Resilience')) {
      WARNINGS.push(`Agent ${file} missing error handling section`);
    }
    
    // Check for YAML frontmatter
    if (!content.startsWith('---')) {
      ERRORS.push(`Agent ${file} missing YAML frontmatter`);
    }
  });
  
  console.log(`✓ Validated ${agentFiles.length} agents`);
}

function validateCommands() {
  console.log('Validating commands...');
  const commandsDir = path.join(PLUGIN_ROOT, 'commands');
  
  if (!fs.existsSync(commandsDir)) {
    ERRORS.push('Missing commands directory');
    return;
  }
  
  const commandFiles = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md'));
  
  commandFiles.forEach(file => {
    const content = fs.readFileSync(path.join(commandsDir, file), 'utf8');
    
    // Check for required sections
    const requiredSections = ['Description', 'Usage', 'Behavior', 'Output Contract'];
    requiredSections.forEach(section => {
      if (!content.includes(`## ${section}`)) {
        WARNINGS.push(`Command ${file} missing section: ${section}`);
      }
    });
    
    // Check for YAML frontmatter
    if (!content.startsWith('---')) {
      ERRORS.push(`Command ${file} missing YAML frontmatter`);
    }
  });
  
  console.log(`✓ Validated ${commandFiles.length} commands`);
}

function validateSkills() {
  console.log('Validating skills...');
  const skillsDir = path.join(PLUGIN_ROOT, 'skills');
  
  if (!fs.existsSync(skillsDir)) {
    ERRORS.push('Missing skills directory');
    return;
  }
  
  const skillDirs = fs.readdirSync(skillsDir).filter(f => {
    return fs.statSync(path.join(skillsDir, f)).isDirectory();
  });
  
  skillDirs.forEach(dir => {
    const skillFile = path.join(skillsDir, dir, 'SKILL.md');
    
    if (!fs.existsSync(skillFile)) {
      ERRORS.push(`Skill ${dir} missing SKILL.md file`);
      return;
    }
    
    const content = fs.readFileSync(skillFile, 'utf8');
    
    // Check for required YAML fields
    if (!content.includes('triggers:')) {
      ERRORS.push(`Skill ${dir} missing triggers definition`);
    }
    
    if (!content.includes('instructions:')) {
      ERRORS.push(`Skill ${dir} missing instructions`);
    }
    
    if (!content.includes('outputs:')) {
      WARNINGS.push(`Skill ${dir} missing outputs definition`);
    }
  });
  
  console.log(`✓ Validated ${skillDirs.length} skills`);
}

function validateConfiguration() {
  console.log('Validating configuration...');
  const configPath = path.join(PLUGIN_ROOT, 'config', 'default.yml');
  
  if (!fs.existsSync(configPath)) {
    ERRORS.push('Missing config/default.yml');
    return;
  }
  
  try {
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
    
    // Check for required top-level sections
    const requiredSections = ['thresholds', 'architecture', 'security', 'performance', 'orchestration', 'logging'];
    requiredSections.forEach(section => {
      if (!config[section]) {
        WARNINGS.push(`Config missing section: ${section}`);
      }
    });
    
    console.log('✓ Configuration valid');
  } catch (err) {
    ERRORS.push(`Invalid YAML in config: ${err.message}`);
  }
}

function validateDirectoryStructure() {
  console.log('Validating directory structure...');
  
  const requiredDirs = [
    '.claude-plugin',
    'agents',
    'commands',
    'skills',
    'config',
    'logs',
    'docs'
  ];
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(PLUGIN_ROOT, dir);
    if (!fs.existsSync(dirPath)) {
      ERRORS.push(`Missing required directory: ${dir}`);
    }
  });
  
  console.log('✓ Directory structure valid');
}

// Run all validations
function main() {
  console.log('=== Newt Plugin Validation ===\n');
  
  validateDirectoryStructure();
  validatePluginManifest();
  validateAgents();
  validateCommands();
  validateSkills();
  validateConfiguration();
  
  console.log('\n=== Validation Results ===');
  
  if (ERRORS.length > 0) {
    console.log(`\n❌ ${ERRORS.length} ERRORS:`);
    ERRORS.forEach(err => console.log(`  - ${err}`));
  }
  
  if (WARNINGS.length > 0) {
    console.log(`\n⚠️  ${WARNINGS.length} WARNINGS:`);
    WARNINGS.forEach(warn => console.log(`  - ${warn}`));
  }
  
  if (ERRORS.length === 0 && WARNINGS.length === 0) {
    console.log('\n✅ All validations passed!');
    process.exit(0);
  } else if (ERRORS.length === 0) {
    console.log('\n✅ No errors (warnings can be addressed)');
    process.exit(0);
  } else {
    console.log('\n❌ Validation failed');
    process.exit(1);
  }
}

main();
