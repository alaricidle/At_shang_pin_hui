import { v4 as uuidv4 } from 'uuid'; //起别名导入
//调用库uuid 获取一段唯一的字符串 当作id   每次执行不能发生变化，游客持久存储
export const getUuid = () => {
    let UUID_token = localStorage.getItem("UUID_TOKEN")
    if (UUID_token == undefined) {
        let id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        localStorage.setItem("UUID_TOKEN", id)
    }
    return UUID_token
}