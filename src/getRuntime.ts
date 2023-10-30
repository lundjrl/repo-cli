import type { OptionValues } from 'commander'
import sh from 'shelljs'
import { colors } from './colors'

type RuntimeResult = (options: OptionValues) => { add: string; install: string; name: string; curl: string }

export const getRuntime: RuntimeResult = options => {
  if (!options) {
    console.error(colors.error('Error: No flags passed.'))
    sh.exit(0)
  }

  if (options.b) {
    return { add: 'bun add', install: 'bun install', name: 'bun', curl: 'curl -fsSL https://bun.sh/install | bash' }
  } else if (options.y) {
    return { add: 'yarn add', install: 'yarn install', name: 'yarn', curl: 'npm install --global yarn' }
  } else if (options.Npm) {
    return { add: 'npm install', install: 'npm install', name: 'npm', curl: '' }
  } else {
    return { add: 'npm install', install: 'npm install', name: 'npm', curl: '' }
  }
}
