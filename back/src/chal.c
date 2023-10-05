#include <stdio.h>
#include <string.h>
#include <cjson/cJSON.h>

cJSON *check_user(const char *username, const char *password) {
    char chk_username[0x20]="";
    char chk_password[0x20]="";
    int ok = 0;

    strcpy(chk_password, password);
    strcpy(chk_username, username);
    if (strcmp(chk_username, "root") == 0 && strcmp(chk_password, "vbgyJHBGaKUIybg") == 0) {
        ok = 1;
    }
    
    cJSON *res = cJSON_CreateObject();
    if(ok){
        cJSON_AddNumberToObject(res, "result", 1);
    } else {
        cJSON_AddNumberToObject(res, "result", 0);
    }
    return res;
}