#!/bin/bash

# Start scripte
echo 'Start Feature'
echo -e "Please enter your feature: "
read name
echo -e "Please enter your author name: "
read AUTHOR
COPPYRIGHT="/* 
    Created by ${AUTHOR}
*/"
echo 'Create feature'

SOURCEDIR="src/features/$name"
echo "$SOURCEDIR"
mkdir -p "$SOURCEDIR"
# chmod -R 777 '"'$SOURCEDIR'"'

upper_name=""
upper_all_name=""
if [[ $name == *"-"* ]]; then
  echo "co dau _"
  IFS='-' # hyphen (-) is set as delimiter
  read -ra ADDR <<< "$name" # str is read into an array as tokens separated by IFS
  for i in "${ADDR[@]}"; do # access each element of array
    echo ${i}
    upper_tmp="$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}"
    upper_all_tmp="$(tr '[:lower:]' '[:upper:]' <<< "$i")"
    upper_name=${upper_name}${upper_tmp}
    if [ "$upper_all_name" == "" ]; then
      upper_all_name="${upper_all_name}${upper_all_tmp}"
    else
      upper_all_name="${upper_all_name}_${upper_all_tmp}"
    fi
    
  done
  IFS=' ' #
else
  upper_name="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"
  upper_all_name="$(tr '[:lower:]' '[:upper:]' <<< "$name")"
fi



# Generate folder View
echo 'Start folder View'
# mkdir -p "$SOURCEDIR/view"
mkdir -p "$SOURCEDIR/components"
touch "$SOURCEDIR/$name.screen.tsx"

echo "${COPPYRIGHT}

import React, { useEffect, useState } from \"react\";
import "${upper_name}"Adapter from \"./${name}.adapter\";
import { "${upper_name}"Props } from \"./${name}.props\";

const ${upper_name}Screen = () => {

  const { } = ${upper_name}Adapter();

  return (
      <div>

      </div>
  );
}

export default ${upper_name}Screen;

" >> "$SOURCEDIR/$name.screen.tsx"

# Generate folder Model

echo 'Start Model'
mkdir -p "$SOURCEDIR"

# Prop
touch "$SOURCEDIR/$name.props.ts"
echo "
${COPPYRIGHT}

export interface ${upper_name}Props {

}
" >> "$SOURCEDIR/$name.props.ts"

# Adapter
touch "$SOURCEDIR/$name.adapter.ts"
echo "
${COPPYRIGHT}

import { Dispatch } from \"redux\";
import ${upper_name}Screen from \"./${name}.screen\";

const ${upper_name}Adapter = () => {

  return {};
}
  
export default ${upper_name}Adapter;


" >> "$SOURCEDIR/$name.adapter.ts"

# Service
touch "$SOURCEDIR/$name.services.ts"
echo "
${COPPYRIGHT}

const axios = require('axios');

const ${upper_name}Services = () => {
  
}

export default ${upper_name}Services;

" >> "$SOURCEDIR/$name.services.ts"

# Scss
touch "$SOURCEDIR/$name.scss"
echo "
${COPPYRIGHT}

" >> "$SOURCEDIR/$name.scss"

echo "End Scripts"


