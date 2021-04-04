export default function getApiUrl(id: string) {
    if (id) {
        return process.env.REACT_APP_IP_ADDRESS_FILE + id;
    }
    return ""

}