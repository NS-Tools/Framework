cd $WORKSPACE_PATH;

# rm -rf $WORKSPACE_PATH/dist;

npm run build;

# Copy to workspace.. temporary workaround for compatibility reasons with EC_Logger.
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/amd/aurelia-logging.js $WORKSPACE_PATH/thirdparty/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/amd/aurelia-logging-console.js $WORKSPACE_PATH/thirdparty/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/aurelia-logging.d.ts $WORKSPACE_PATH/thirdparty/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/aurelia-logging-console.d.ts $WORKSPACE_PATH/thirdparty/

# Copy to build.
mkdir -p $WORKSPACE_PATH/dist/js/thirdparty/
mkdir -p $WORKSPACE_PATH/dist/declarations/thirdparty/

# Aurelia Logging
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/amd/aurelia-logging.js $WORKSPACE_PATH/dist/js/thirdparty/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/amd/aurelia-logging-console.js $WORKSPACE_PATH/dist/js/thirdparty/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/aurelia-logging.d.ts $WORKSPACE_PATH/dist/declarations/thirdparty/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/aurelia-logging-console.d.ts $WORKSPACE_PATH/dist/declarations/thirdparty/
