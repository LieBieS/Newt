/**
 * Enterprise Skill Consolidation
 * Combines redundant skills into unified, executable modules with clear domain boundaries
 * Enables better maintainability, reduced cognitive load, and consistent API design
 */

class SkillContainer {
  constructor(basePath = './skills') {
    this.basePath = basePath;
    this.skills = new Map();
    this.executableModules = new Map();
  }

  /**
   * Load all skills from filesystem (skills/ directory structure)
   */
  loadSkills() {
    const skillDirs = fs.readdirSync(this.basePath).filter(dir => 
      fs.statSync(path.join(this.basePath, dir)).isDirectory()
    );
    
    for (const skillName of skillDirs) {
      const skillMD = path.join(this.basePath, skillName, 'SKILL.md');
      if (fs.existsSync(skillMD)) {
        const skill = new ExecutableSkill(skillName, skillMD);
        this.skills.set(skillName, skill);
      }
    }
    return this.skills;
  }

  /**
   * Register executable module for a specific skill
   * Replaces the default implementation with a real agent/module
   */
  registerExecutable(skillName, module) {
    this.executableModules.set(skillName, module);
    const skill = this.skills.get(skillName);
    if (skill) {
      skill.executeSkill = async (params, context) => module.execute(params, context);
    }
  }

  /**
   * Execute a skill with dependency injection
   */
  async execute(skillName, params, context = {}) {
    const skill = this.skills.get(skillName);
    if (!skill) {
      throw new Error(`Skill not found: ${skillName}`);
    }

    const module = this.executableModules.get(skillName);
    if (module) {
      return skill.execute(params, context);  // Use real agent if exists
    }
    
    // If no executable module, return skill metadata (for non-executable skills)
    return {
      skill: skillName,
      metadata: skill.metadata,
      available: true
    };
  }

  getSkillMetadata(skillName) {
    const skill = this.skills.get(skillName);
    return skill ? skill.metadata : null;
  }

  getAllSkills() {
    return Array.from(this.skills.keys());
  }

  getAllMetrics() {
    const metrics = {};
    for (const [name, skill] of this.skills) {
      metrics[name] = skill.getMetrics();
    }
    return metrics;
  }

  clearCache() {
    // no-op for stateless container
  }

  registerSkill(skillName, skill) {
    this.skills.set(skillName, skill);
  }

  registerExecutableModule(skillName, module) {
    this.executableModules.set(skillName, module);
  }

  async executeSkill(skillName, params, context = {}) {
    const skill = this.skills.get(skillName);
    if (!skill) {
      throw new Error(`Skill not found: ${skillName}`);
    }
    const module = this.executableModules.get(skillName);
    if (module) {
      return module.execute(params, context);
    }
    return {
      skill: skillName,
      metadata: skill.metadata,
      available: true
    };
  }
}

module.exports = { SkillContainer, ExecutableSkill };
module.exports.default = SkillContainer;

module.exports = { SkillContainer, ExecutableSkill };
module.exports.default = SkillContainer;