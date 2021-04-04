#!/bin/bash

# Start scripte
echo 'Start Component'

echo -e "Please enter your root folder's name: "
read root_folder
echo -e "Please enter your component's name: "
read name
echo -e "Please enter your author name: "
read AUTHOR
COPPYRIGHT="/* 
    Created by ${AUTHOR}
*/"
echo 'Create component'

SOURCEDIR="${root_folder}/$name"

echo $SOURCEDIR
mkdir "$SOURCEDIR"
chmod -R 777 "$SOURCEDIR"


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

# Generate folder Component
echo 'Start folder Component'
# mkdir "$SOURCEDIR/$name"
touch "$SOURCEDIR/$name.component.tsx"

echo "${COPPYRIGHT}

import React, { FunctionComponent as Component, PureComponent } from 'react';
import {
    StyleSheet
} from 'react-native';
import { ${upper_name}Props } from './${name}.props';
import { ${upper_name}Adapter } from './${name}.adapter';

export class ${upper_name}Component extends PureComponent<${upper_name}Props> {
  private ${upper_name}Adapter: ${upper_name}Adapter;
 constructor(props: ${upper_name}Props) {
    super(props);
    this.${upper_name}Adapter = new ${upper_name}Adapter(this);
  }

  render() {
    return (
      <>
        
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {

    }
});

" >> "$SOURCEDIR/$name.component.tsx"

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
import {  ${upper_name}Component } from './${name}.component';

export class ${upper_name}Adapter {
  private ${upper_name}Component: ${upper_name}Component;
 
  constructor(Component: ${upper_name}Component) {
    this.${upper_name}Component = Component;
  }
  
}


" >> "$SOURCEDIR/$name.adapter.ts"

echo "End Scripts"