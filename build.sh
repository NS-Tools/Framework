cd $WORKSPACE_PATH;

rm -rf $WORKSPACE_PATH/dist;
rm -rf $WORKSPACE_PATH/thirdparty;

# Copy to workspace.. temporary workaround for compatibility reasons with EC_Logger.
# make Third Party folder
mkdir -p $WORKSPACE_PATH/thirdparty/{aurelia-logging,transactsql}/

# Build Third Party folders
# Aurelia Logging
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/amd/aurelia-logging.js $WORKSPACE_PATH/thirdparty/aurelia-logging/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/amd/aurelia-logging-console.js $WORKSPACE_PATH/thirdparty/aurelia-logging/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/aurelia-logging.d.ts $WORKSPACE_PATH/thirdparty/aurelia-logging/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/aurelia-logging-console.d.ts $WORKSPACE_PATH/thirdparty/aurelia-logging/

# Node SQL Parser
cp -R $WORKSPACE_PATH/node_modules/node-sql-parser/umd/transactsql.umd.js $WORKSPACE_PATH/thirdparty/transactsql/
cp -R $WORKSPACE_PATH/node_modules/node-sql-parser/types.d.ts $WORKSPACE_PATH/thirdparty/transactsql/
cp -R $WORKSPACE_PATH/node_modules/node-sql-parser/umd/transactsql.umd.d.ts $WORKSPACE_PATH/thirdparty/transactsql/
sed -i -e 's/\.\.\/types/\.\/types/g' $WORKSPACE_PATH/thirdparty/transactsql/transactsql.umd.d.ts

# Build the project
npm run build;

# Copy to build.
mkdir -p $WORKSPACE_PATH/dist/js/thirdparty/{aurelia-logging,transactsql}/
mkdir -p $WORKSPACE_PATH/dist/declarations/thirdparty/{aurelia-logging,transactsql}/

cp -R $WORKSPACE_PATH/thirdparty/aurelia-logging/*.js $WORKSPACE_PATH/dist/js/thirdparty/aurelia-logging/
cp -R $WORKSPACE_PATH/thirdparty/aurelia-logging/*.d.ts $WORKSPACE_PATH/dist/declarations/thirdparty/aurelia-logging/

cp -R $WORKSPACE_PATH/thirdparty/transactsql/*.js $WORKSPACE_PATH/dist/js/thirdparty/transactsql/
cp -R $WORKSPACE_PATH/thirdparty/transactsql/*.d.ts $WORKSPACE_PATH/dist/declarations/thirdparty/transactsql/