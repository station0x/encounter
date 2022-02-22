import prod from './prod.json'
import dev from './dev.json'

const isProd = process.env.VUE_APP_ENV === "prod"

export default isProd? prod: dev