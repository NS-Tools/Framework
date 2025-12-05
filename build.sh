cd $WORKSPACE_PATH;

rm -rf $WORKSPACE_PATH/dist;
rm -rf $WORKSPACE_PATH/thirdparty/core;

# make Third Party folder
mkdir -p $WORKSPACE_PATH/thirdparty/core/{aurelia-logging,transactsql}/

# Build Third Party folders
# Aurelia Logging
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/amd/aurelia-logging.js $WORKSPACE_PATH/thirdparty/core/aurelia-logging/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/amd/aurelia-logging-console.js $WORKSPACE_PATH/thirdparty/core/aurelia-logging/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging/dist/aurelia-logging.d.ts $WORKSPACE_PATH/thirdparty/core/aurelia-logging/
cp -R $WORKSPACE_PATH/node_modules/aurelia-logging-console/dist/aurelia-logging-console.d.ts $WORKSPACE_PATH/thirdparty/core/aurelia-logging/

# Node SQL Parser
cp -R $WORKSPACE_PATH/node_modules/node-sql-parser/umd/transactsql.umd.js $WORKSPACE_PATH/thirdparty/core/transactsql/
cp -R $WORKSPACE_PATH/node_modules/node-sql-parser/types.d.ts $WORKSPACE_PATH/thirdparty/core/transactsql/
cp -R $WORKSPACE_PATH/node_modules/node-sql-parser/umd/transactsql.umd.d.ts $WORKSPACE_PATH/thirdparty/core/transactsql/
sed -i -e 's/\.\.\/types/\.\/types/g' $WORKSPACE_PATH/thirdparty/core/transactsql/transactsql.umd.d.ts

# Build the project
npx tsc -p tsconfig.json

# Copy third party files to dist
mkdir -p $WORKSPACE_PATH/dist/js/thirdparty/core/{aurelia-logging,transactsql}/
mkdir -p $WORKSPACE_PATH/dist/declarations/thirdparty/core/{aurelia-logging,transactsql}/

cp -R $WORKSPACE_PATH/thirdparty/core/aurelia-logging/*.js $WORKSPACE_PATH/dist/js/thirdparty/core/aurelia-logging/
cp -R $WORKSPACE_PATH/thirdparty/core/aurelia-logging/*.d.ts $WORKSPACE_PATH/dist/declarations/thirdparty/core/aurelia-logging/
cp -R $WORKSPACE_PATH/thirdparty/core/transactsql/*.js $WORKSPACE_PATH/dist/js/thirdparty/core/transactsql/
cp -R $WORKSPACE_PATH/thirdparty/core/transactsql/*.d.ts $WORKSPACE_PATH/dist/declarations/thirdparty/core/transactsql/

if [ -d "$WORKSPACE_PATH/thirdparty/optional" ]; then
    echo "Optional third party folder found. Copying files..."

    mkdir -p $WORKSPACE_PATH/dist/js/thirdparty/optional/
    cp -R $WORKSPACE_PATH/thirdparty/optional/*.js $WORKSPACE_PATH/dist/js/thirdparty/optional/

    mkdir -p $WORKSPACE_PATH/dist/declarations/thirdparty/optional/
    cp -R $WORKSPACE_PATH/thirdparty/optional/*.d.ts $WORKSPACE_PATH/dist/declarations/thirdparty/optional/
fi