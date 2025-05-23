import axios from 'axios'

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: 'https://kopipes-backend-1082564059873.asia-southeast1.run.app', // Set your API base URL here
  // baseURL: 'http://localhost:8000/', // Set your API base URL here
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  // Generic POST request function
  async postData(endpoint, data, headers = {}) {
    try {
      const response = await apiClient.post(endpoint, data, { headers })
      return response.data
    } catch (error) {
      console.error('API POST Error:', error)
      throw error
    }
  },

  async userList(data) {
    return await this.postData('/users/', data)
  },

  async userRegister(data) {
    return await this.postData('/users/register', data)
  },

  async userLogin(data) {
    return await this.postData('/users/login', data)
  },

  async userDetail(email) {
    return await this.postData(`/users/${email}`)
  },

  async userDetailUpdate(email, data) {
    return await this.postData(`/users/${email}/update`, data)
  },

  async userPersonalityTest(email, data) {
    return await this.postData(`/users/${email}/evaluate`, data)
  },

  async userUploadResume(email, file) {
    const formData = new FormData()
    formData.append('file', file) // Send only the file

    try {
      const response = await apiClient.post(`/users/${email}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('File Upload Error:', error)
      throw error
    }
  },

  //

  async jobListing(email = '') {
    const endpoint = email ? `/jobs/?email=${email}` : '/jobs/'
    return await this.postData(endpoint)
  },

  async jobDesc(id, email = '') {
    let endpoint = `/jobs/?id=${id}`
    if (email) {
      endpoint += `&email=${email}`
    }
    return await this.postData(endpoint)
  },

  async jobApply(email, id = null) {
    return await this.postData(`/users/${email}/apply/${id}`)
  },

  async jobListingAdmin() {
    return await this.postData(`/jobs/?employer_id=7`)
  },

  async skillGetQuestions(email) {
    return await this.postData(`/users/${email}/skill-assess`)
  },
}
