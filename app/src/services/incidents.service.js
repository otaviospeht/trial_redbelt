import http from '../http-common';

class IncidentsService {
    all() {
        return http.get(`/incidents`);
    }
    find(id) {
        return http.get(`/incidents/${id}`);
    }
    create(data) {
        return http.post(`/incidents`, data);
    }
    update(data) {
        return http.put(`/incidents/${data.id}`, data);
    }
    destroy(id) {
        return http.delete(`/incidents/${id}`, {id});
    }
}

export default new IncidentsService();