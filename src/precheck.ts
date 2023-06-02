import sh from 'shelljs'
import { colors } from './colors.js'

export const precheck = () => {
  if (!sh.which('git')) {
    console.log(colors.error('Sorry, this tool required git to be installed.'))
    sh.exit(1)
  }
}
