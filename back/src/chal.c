#include <stdio.h>
#include <string.h>
#include <cjson/cJSON.h>

cJSON *check_user(const char *username, const char *password) {
    int ok = 0;
    char chk_username[20];
    char chk_password[20];

    strcpy(chk_username, username);
    strcpy(chk_password, password);
    if (strcmp(chk_username, "root") == 0 && strcmp(chk_password, "vbgyJHBG#$U'ybgi") == 0) {
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