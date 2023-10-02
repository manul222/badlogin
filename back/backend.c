#include <stdio.h>
#include <string.h>
#include <microhttpd.h>
#include <cjson/cJSON.h>

#define PORT 8080

int handle_get_request(void *cls, struct MHD_Connection *connection,
                       const char *url, const char *method,
                       const char *version, const char *upload_data,
                       size_t *upload_data_size, void **ptr) {
    
    struct MHD_Response *response;
    int ret;
    char *response_data;
    cJSON *root = cJSON_CreateObject();

    if (0 != strcmp(method, "GET")) {
        return MHD_NO;
    }

    const char *username = MHD_lookup_connection_value(connection, MHD_GET_ARGUMENT_KIND, "username");
    // const char *password = MHD_lookup_connection_value(connection, MHD_GET_ARGUMENT_KIND, "password"); // For now, we aren't using password

    if (username && strcmp(username, "root") == 0) {
        cJSON_AddStringToObject(root, "result", "success");
    } else {
        cJSON_AddStringToObject(root, "result", "failure");
    }

    response_data = cJSON_Print(root);
    response = MHD_create_response_from_buffer(strlen(response_data), (void *)response_data, MHD_RESPMEM_MUST_FREE);
    MHD_add_response_header(response, "Content-Type", "application/json");
    ret = MHD_queue_response(connection, MHD_HTTP_OK, response);
    MHD_destroy_response(response);

    cJSON_Delete(root);

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
        // This is just a simple loop to keep the server alive
        // In a real-world application, you might have other logic here or use a different mechanism
        sleep(10);
    }

    return 0;
}
