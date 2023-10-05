#ifndef BACKEND_H
#define BACKEND_H

#include <stdio.h>
#include <string.h>
#include <microhttpd.h>
#include <cjson/cJSON.h>
#include "chal.h"

void add_cors_headers(struct MHD_Response *response);
int handle_get_request(void *cls, struct MHD_Connection *connection, const char *url, const char *method, const char *version, const char *upload_data, size_t *upload_data_size, void **con_cls);

#endif
