#!/usr/bin/env node
/**
 * Newt Configuration Validator
 * Validates configuration files against schema and checks for common issues
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const PLUGIN_ROOT = path.join(__dirname, '..');
const ERRORS = [];
const WARNINGS = [];

function validateConfig(configPath, schemaPath) {
  console.log(`Validating ${configPath}...`);
  
  if (!fs.existsSync(configPath)) {
    ERRORS.push(`Config file not found: ${configPath}`);
    return;
  }
  
  try {
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
    
    // Validate thresholds
    if (config.thresholds) {
      validateThresholds(config.thresholds);
    }
    
    // Validate review policies
    if (config.review_policies) {
      validateReviewPolicies(config.review_policies);
    }
    
    // Validate brainstorming config
    if (config.brainstorming) {
      validateBrainstorming(config.brainstorming);
    }
    
    // Validate integrations
    if (config.integrations) {
      validateIntegrations(config.integrations);
    }

    // Validate frontend design config
    if (config.frontend_design) {
      validateFrontendDesign(config.frontend_design);
    }
    
    console.log(`✓ ${configPath} is valid`);
  } catch (err) {
    ERRORS.push(`Invalid YAML in ${configPath}: ${err.message}`);
  }
}

function validateThresholds(thresholds) {
  const languages = ['typescript', 'javascript', 'python', 'java', 'csharp', 'ruby', 'go'];
  
  if (thresholds.lines_of_code) {
    Object.entries(thresholds.lines_of_code).forEach(([lang, value]) => {
      if (!languages.includes(lang)) {
        WARNINGS.push(`Unknown language in lines_of_code: ${lang}`);
      }
      if (value < 50 || value > 1000) {
        WARNINGS.push(`Unusual lines_of_code threshold for ${lang}: ${value}`);
      }
    });
  }
  
  if (thresholds.cyclomatic_complexity) {
    Object.entries(thresholds.cyclomatic_complexity).forEach(([lang, value]) => {
      if (value < 1 || value > 20) {
        WARNINGS.push(`Unusual cyclomatic_complexity threshold for ${lang}: ${value}`);
      }
    });
  }
}

function validateReviewPolicies(policies) {
  if (policies.pr_size_limits) {
    const limits = policies.pr_size_limits;
    
    if (limits.max_commits && limits.suggest_split_above) {
      if (limits.suggest_split_above >= limits.max_commits) {
        WARNINGS.push('suggest_split_above should be less than max_commits');
      }
    }
    
    if (limits.max_files_changed && limits.max_files_changed < 10) {
      WARNINGS.push('max_files_changed seems very low');
    }
  }
}

function validateBrainstorming(brainstorming) {
  const validFrameworks = ['scamper', 'six_hats', 'triz', 'mind_mapping', 'constraint_analysis'];
  
  if (brainstorming.mode_defaults) {
    Object.entries(brainstorming.mode_defaults).forEach(([mode, config]) => {
      if (config.frameworks) {
        config.frameworks.forEach(framework => {
          if (!validFrameworks.includes(framework)) {
            WARNINGS.push(`Unknown brainstorming framework: ${framework}`);
          }
        });
      }
      
      if (config.min_ideas && config.min_ideas < 5) {
        WARNINGS.push(`min_ideas for ${mode} seems low: ${config.min_ideas}`);
      }
    });
  }
  
  if (brainstorming.scoring_weights) {
    const weights = brainstorming.scoring_weights;
    const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
    
    if (Math.abs(total - 5.0) > 0.1) {
      WARNINGS.push(`Scoring weights sum to ${total}, expected ~5.0`);
    }
  }
}

function validateIntegrations(integrations) {
  if (integrations.github && integrations.github.enabled) {
    if (!process.env.GITHUB_TOKEN) {
      WARNINGS.push('GitHub integration enabled but GITHUB_TOKEN not set');
    }
  }
  
  if (integrations.jira && integrations.jira.enabled) {
    if (!integrations.jira.project_key) {
      ERRORS.push('Jira integration enabled but project_key not specified');
    }
    if (!process.env.JIRA_API_TOKEN) {
      WARNINGS.push('Jira integration enabled but JIRA_API_TOKEN not set');
    }
  }
  
  if (integrations.slack && integrations.slack.enabled) {
    if (!integrations.slack.webhook_url && !process.env.SLACK_WEBHOOK_URL) {
      ERRORS.push('Slack integration enabled but webhook_url not configured');
    }
  }
}

function validateFrontendDesign(frontendDesign) {
  if (frontendDesign.accessibility) {
    const a11y = frontendDesign.accessibility;
    if (typeof a11y.contrast_ratio === 'number') {
      if (a11y.contrast_ratio < 3 || a11y.contrast_ratio > 21) {
        WARNINGS.push(`Unusual accessibility contrast_ratio: ${a11y.contrast_ratio}`);
      }
      if (a11y.contrast_ratio < 4.5) {
        WARNINGS.push(`contrast_ratio ${a11y.contrast_ratio} may not meet WCAG AA for normal text (4.5)`);
      }
    }
  }

  if (frontendDesign.responsive) {
    const r = frontendDesign.responsive;
    if (r.touch_target_min_px && r.touch_target_min_px < 40) {
      WARNINGS.push(`touch_target_min_px ${r.touch_target_min_px} may be too small; 44px is a common minimum`);
    }
    if (r.breakpoints) {
      const order = ['mobile', 'tablet', 'desktop', 'wide'];
      const values = order
        .map((k) => ({ k, v: r.breakpoints[k] }))
        .filter((x) => typeof x.v === 'string');
      if (values.length > 0) {
        values.forEach(({ k, v }) => {
          if (!/^[0-9]+px$/.test(v)) {
            WARNINGS.push(`Breakpoint ${k} has non-px value: ${v}`);
          }
        });
      }
    }
  }

  if (frontendDesign.performance && frontendDesign.performance.core_web_vitals_budgets) {
    const b = frontendDesign.performance.core_web_vitals_budgets;
    if (b.lcp_ms && b.lcp_ms > 4000) {
      WARNINGS.push(`LCP budget is high (${b.lcp_ms}ms); consider <= 2500ms`);
    }
    if (b.inp_ms && b.inp_ms > 500) {
      WARNINGS.push(`INP budget is high (${b.inp_ms}ms); consider <= 200ms`);
    }
    if (typeof b.cls === 'number' && b.cls > 0.25) {
      WARNINGS.push(`CLS budget is high (${b.cls}); consider <= 0.1`);
    }
  }
}

function main() {
  console.log('=== Newt Configuration Validation ===\n');
  
  const configFiles = [
    path.join(PLUGIN_ROOT, 'config', 'default.yml'),
    path.join(PLUGIN_ROOT, 'config', 'environments', 'development.yml'),
    path.join(PLUGIN_ROOT, 'config', 'environments', 'production.yml'),
    path.join(PLUGIN_ROOT, 'config', 'environments', 'ci.yml')
  ];
  
  configFiles.forEach(configPath => {
    if (fs.existsSync(configPath)) {
      validateConfig(configPath);
    }
  });
  
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
    console.log('\n✅ All configurations valid!');
    process.exit(0);
  } else if (ERRORS.length === 0) {
    console.log('\n✅ No errors (warnings can be addressed)');
    process.exit(0);
  } else {
    console.log('\n❌ Configuration validation failed');
    process.exit(1);
  }
}

main();
