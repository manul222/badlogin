#ifndef CHAL_H
#define CHAL_H

#include <stdio.h>
#include <string.h>
#include <cjson/cJSON.h>

cJSON *check_user(const char *username, const char *password);

#endif
