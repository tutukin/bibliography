@echo off

if exist deploy.local.cmd (
    deploy.local.cmd
) else (
    echo "You may define a file deploy.local.cmd that performs extra steps, like copying the plugin to a vault."
)