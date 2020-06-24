import http from "../http-common";

class AnnouncementDataService {
  getAll() {
    return http.get("/announcement");
  }

  get(id) {
    return http.get(`/announcement/${id}`);
  }

  create(data) {
    return http.post("/announcement", data);
  }

  update(id, data) {
    return http.put(`/announcement/${id}`, data);
  }

  delete(id) {
    return http.delete(`/announcement/${id}`);
  }

  deleteAll() {
    return http.delete(`/announcement`);
  }

  findByName(name) {
    return http.get(`/announcement?title=${name}`);
  }
}

export default new AnnouncementDataService();