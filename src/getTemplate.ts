import type { OptionValues } from 'commander'
import sh from 'shelljs'

type TemplateResult = (options: OptionValues) => { path: string; replacementName: string; repo: string } | void

export const getTemplate: TemplateResult = options => {
  if (!options) {
    sh.exit(0)
  }

  const path = `./${options.projectName}`

  if (options.n) {
    return {
      path,
      replacementName: 'Node-template',
      repo: 'https://github.com/lundjrl/Node-Template.git',
    }
  } else if (options.Njs) {
    return {
      path,
      replacementName: 'Next-App-Template',
      repo: 'https://github.com/lundjrl/Next-App-Template',
    }
  } else if (options.Rn) {
    return {
      path,
      replacementName: 'React-Native-Template',
      repo: 'https://github.com/lundjrl/React-Native-Template',
    }
  }

  return
}
