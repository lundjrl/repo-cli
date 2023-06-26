import type { OptionValues } from 'commander'
import sh from 'shelljs'

type TemplateResult = (options: OptionValues) => { path: string; replacementName: string; repo: string } | null

export const getTemplate: TemplateResult = options => {
  if (!options) {
    sh.exit(0)
  }

  const path = `./${options.projectName}`

  if (typeof options.Njs === 'boolean') {
    return {
      path,
      replacementName: 'Next-App-Template',
      repo: 'https://github.com/lundjrl/Next-App-Template.git',
    }
  } else if (typeof options.n === 'boolean') {
    return {
      path,
      replacementName: 'Node-Template',
      repo: 'https://github.com/lundjrl/Node-Template.git',
    }
  } else if (typeof options.Rn === 'boolean') {
    return {
      path,
      replacementName: 'React-Native-Template',
      repo: 'https://github.com/lundjrl/React-Native-Template.git',
    }
  }

  return null
}
