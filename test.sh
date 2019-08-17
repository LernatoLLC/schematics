#!/bin/bash

#this is intended to be used in a test project that imports these schematics
#npm i -D @lernato/schematics@latest

rm -rf src/app/{components,models,services,store}

ng generate @lernato/schematics:model --name test-model
ng generate @lernato/schematics:model -n test-model1

ng generate @lernato/schematics:component --name test-component
ng generate @lernato/schematics:component -n test-component-m -m
ng generate @lernato/schematics:component -n test-component-r -r
ng generate @lernato/schematics:component -n test-component-p -p testprefix

ng generate @lernato/schematics:service --name test-service
ng generate @lernato/schematics:service -n test-service1

ng generate @lernato/schematics:store --name test-store
ng generate @lernato/schematics:store -n test-store1
