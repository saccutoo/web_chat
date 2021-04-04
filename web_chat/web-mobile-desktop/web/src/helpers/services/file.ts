import { postFile } from "../api/api-helper"
import { URL_PATHS } from "../networking/url-paths"

const FileServices = {
    send : async (formData: FormData) => {
        return await postFile(
            URL_PATHS.POST_FILE,
            formData,
            true
        )
    }
}

export default FileServices