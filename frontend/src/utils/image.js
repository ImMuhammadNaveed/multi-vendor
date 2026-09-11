import { backend_url } from "../server"

export const getImageUrl = (image) => {
    if (!image) {
        return ""
    }

    if (typeof image === "string") {
        return image.startsWith("http") ? image : `${backend_url}/uploads/${image}`
    }

    return image.url || ""
}
