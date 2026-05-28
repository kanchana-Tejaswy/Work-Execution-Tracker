import * as projectLib from './projects/project.service'
import * as updateLib from './projects/update.service'

/**
 * Compatibility wrapper for the new modular project services.
 */
export class ProjectService {
  static async getAllProjects() {
    return await projectLib.getProjects()
  }

  static async getProjectById(id: string) {
    return await projectLib.getProjectById(id)
  }

  static async createProject(data: any) {
    return await projectLib.createProject(data)
  }
}

export class UpdateService {
  static async getUpdatesByProject(projectId: string) {
    return await updateLib.getProjectUpdates(projectId)
  }

  static async createUpdate(data: any) {
    return await updateLib.submitUpdate(data)
  }
}
