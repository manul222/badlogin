#include <stdio.h>
#include <string.h>
#include <microhttpd.h>
#include <cjson/cJSON.h>
#include "chal.h"

#define PORT 8080

void add_cors_headers(struct MHD_Response *response) {
    MHD_add_response_header(response, "Access-Control-Allow-Origin", "*");
    MHD_add_response_header(response, "Access-Control-Allow-Methods", "GET, POST, DELETE");
    MHD_add_response_header(response, "Access-Control-Allow-Headers", "Content-Type");
}

int handle_get_request(void *cls, struct MHD_Connection *connection,
                       const char *url, const char *method,
                       const char *version, const char *upload_data,
                       size_t *upload_data_size, void **ptr) {
    
    struct MHD_Response *response;
    int ret;
    char *response_data;
    cJSON *result = cJSON_CreateObject();

    if (0 != strcmp(method, "GET")) {
        return MHD_NO;
    }

    const char *username = MHD_lookup_connection_value(connection, MHD_GET_ARGUMENT_KIND, "username");
    const char *password = MHD_lookup_connection_value(connection, MHD_GET_ARGUMENT_KIND, "password");

    result = check_user(username, password);

    response_data = cJSON_Print(result);
    response = MHD_create_response_from_buffer(strlen(response_data), (void *)response_data, MHD_RESPMEM_MUST_FREE);
    add_cors_headers(response);
    MHD_add_response_header(response, "Content-Type", "application/json");
    ret = MHD_queue_response(connection, MHD_HTTP_OK, response);
    MHD_destroy_response(response);

    cJSON_Delete(result);

    return ret;
}

int main() {
    struct MHD_Daemon *daemon;

    daemon = MHD_start_daemon(MHD_USE_SELECT_INTERNALLY, PORT, NULL, NULL, &handle_get_request, NULL, MHD_OPTION_END);
    if (daemon == NULL) {
        fprintf(stderr, "Failed to start microhttpd daemon\n");
        return 1;
    }
    printf("Login server started on port %d\n", PORT);

    while(1) {
        sleep(10);
    }

    return 0;
}
