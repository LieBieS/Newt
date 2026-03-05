---
title: Newt Troubleshooting Guide
description: Common issues and solutions for the Newt plugin.
---

# Troubleshooting Guide

## Installation Issues

### Plugin Not Listed After Install
**Symptom**: Plugin doesn't appear in Claude Code/Windsurf/Cursor after installation.

**Solutions**:
1. Restart the IDE completely
2. Verify plugin directory structure:
   ```
   newt/
   ├── .claude-plugin/
   │   └── plugin.json
   ├── agents/
   ├── commands/
   └── skills/
   ```
3. Check `plugin.json` is valid JSON (no trailing commas)
4. Re-run installation commands:
   ```
   /plugin marketplace add ./newt
   /plugin install newt
   ```

### Permission Errors
**Symptom**: "Permission denied" or "Access denied" errors.

**Solutions**:
1. Ensure write permissions on `logs/` directories
2. Run IDE with appropriate permissions
3. Check antivirus isn't blocking file writes
4. Verify Git hooks are executable (Unix/Mac):
   ```bash
   chmod +x .git/hooks/pre-commit
   ```

---

## Runtime Issues

### Slow Analysis Performance
**Symptom**: Commands take >30 seconds to complete.

**Solutions**:
1. Use `--path` to limit scope:
   ```
   /review --path src/auth
   ```
2. Use `--depth quick` for faster analysis:
   ```
   /review --depth quick
   ```
3. Check `config/default.yml` timeout settings:
   ```yaml
   orchestration:
     timeout_seconds: 120
   ```
4. Clear cache if stale:
   ```bash
   rm -rf logs/.cache
   ```

### Missing Suggestions
**Symptom**: No inline suggestions or empty output sections.

**Solutions**:
1. Verify file permissions and Git status
2. Check file extensions match skill triggers
3. Ensure files are not gitignored
4. Review `logs/errors/` for failure details
5. Verify configuration is loaded:
   ```
   /config validate
   ```

### Hook Not Working
**Symptom**: Pre-commit/pre-push hooks don't trigger.

**Solutions**:
1. Verify hook file exists and is executable:
   ```bash
   ls -la .git/hooks/pre-commit
   chmod +x .git/hooks/pre-commit
   ```
2. Check hook script syntax:
   ```bash
   bash -n .git/hooks/pre-commit
   ```
3. Test hook manually:
   ```bash
   .git/hooks/pre-commit
   ```
4. Ensure PATH includes plugin location

---

## Integration Issues

### IDE Integration Not Working
**Symptom**: No inline annotations or sidebar in Windsurf/Cursor.

**Solutions**:
1. Restart IDE after plugin installation
2. Check IDE plugin settings/preferences
3. Verify plugin is enabled in IDE settings
4. Check IDE console for error messages
5. Try toggling agent off/on in IDE

### GitHub Integration Failing
**Symptom**: PR comments not posting or merge blocking not working.

**Solutions**:
1. Verify `GITHUB_TOKEN` environment variable set
2. Check token has required permissions (repo, write:discussion)
3. Verify webhook URL in `config/default.yml`:
   ```yaml
   integrations:
     github:
       enabled: true
       auto_comment: true
   ```
4. Check GitHub API rate limits
5. Review `logs/errors/` for API errors

### Jira Integration Issues
**Symptom**: Issues not created or updated in Jira.

**Solutions**:
1. Verify `JIRA_API_TOKEN` environment variable
2. Check project key in config:
   ```yaml
   integrations:
     jira:
       project_key: "DEV"
   ```
3. Verify Jira API endpoint accessibility
4. Check user permissions in Jira project
5. Review API error logs

---

## Configuration Issues

### Config Validation Fails
**Symptom**: "Invalid configuration" errors.

**Solutions**:
1. Validate YAML syntax:
   ```bash
   yamllint config/default.yml
   ```
2. Check against schema:
   ```bash
   node scripts/config-validator.js
   ```
3. Verify all required fields present
4. Check for typos in field names
5. Ensure values match expected types

### Environment Overrides Not Applied
**Symptom**: Changes in environment configs ignored.

**Solutions**:
1. Verify environment file loaded:
   ```bash
   echo $NEWT_ENV
   ```
2. Check file precedence:
   - `config/teams/team-a.yml` (highest)
   - `config/environments/production.yml`
   - `config/default.yml` (lowest)
3. Restart IDE after config changes
4. Clear config cache if applicable

---

## Agent/Skill Issues

### Agent Timeout
**Symptom**: "Agent timed out" errors.

**Solutions**:
1. Increase timeout in config:
   ```yaml
   orchestration:
     timeout_seconds: 180
   ```
2. Reduce analysis scope with `--path`
3. Check for infinite loops in custom skills
4. Review agent logs for bottlenecks

### Skill Not Triggering
**Symptom**: Automated skills don't run on code changes.

**Solutions**:
1. Verify trigger configuration in `SKILL.md`:
   ```yaml
   triggers:
     - event: code_change
       filter: "**/*.ts"
   ```
2. Check file extension matches filter
3. Ensure skill registered in `plugin.json`
4. Review skill logs for errors
5. Test skill manually

### Degraded Mode
**Symptom**: Output shows "Status: Degraded" sections.

**Solutions**:
1. Check `logs/errors/` for root cause
2. Verify external services accessible (CVE feeds, etc.)
3. Check network connectivity
4. Review circuit breaker status
5. Clear cache and retry

---

## Logging Issues

### Logs Not Created
**Symptom**: No files in `logs/reviews/` or `logs/brainstorm/`.

**Solutions**:
1. Verify directory permissions:
   ```bash
   ls -ld logs/reviews
   ```
2. Check logging enabled in config:
   ```yaml
   logging:
     enabled: true
   ```
3. Ensure disk space available
4. Review write permissions
5. Check log retention settings

### Log Files Too Large
**Symptom**: Log files consuming excessive disk space.

**Solutions**:
1. Adjust retention settings:
   ```yaml
   logging:
     retention_days: 30
     max_file_size_mb: 100
   ```
2. Implement log rotation
3. Archive old logs
4. Reduce log level:
   ```yaml
   logging:
     level: "warn"
   ```

---

## Performance Optimization

### High Memory Usage
**Solutions**:
1. Reduce concurrent analysis:
   ```yaml
   orchestration:
     parallel_agents: false
   ```
2. Limit cache size
3. Use incremental analysis
4. Reduce max file size thresholds

### High CPU Usage
**Solutions**:
1. Reduce analysis depth
2. Limit concurrent agents
3. Increase timeout to reduce retries
4. Use sampling for large repos

---

## Getting Help

### Debug Mode
Enable detailed logging:
```yaml
logging:
  level: "debug"
  structured: true
```

### Collect Diagnostics
```bash
# Collect logs
tar -czf newt-diagnostics.tar.gz logs/

# Check configuration
cat config/default.yml

# Verify plugin structure
tree -L 2 newt/
```

### Report Issues
Include in bug reports:
1. Newt version (`plugin.json` version field)
2. IDE and version (Windsurf/Cursor/Claude Code)
3. Operating system
4. Error logs from `logs/errors/`
5. Configuration (sanitize secrets)
6. Steps to reproduce

### Community Support
- GitHub Issues: [repo-url]/issues
- Slack: #newt-support
- Documentation: `docs/`
