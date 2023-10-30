#! /usr/bin/env node

import sh from 'shelljs'
import { colors } from './src/colors.js'
import { program } from './src/commander.js'
import { getRuntime } from './src/getRuntime.js'
import { getTemplate } from './src/getTemplate.js'
import { precheck } from './src/precheck.js'
import { initAnimation } from './src/animation.js'

export const main = () => {
  const dupVal = 5
  let animations: NodeJS.Timeout[] = []

  try {
    console.log(colors.info('\nStarting...'))
    console.log(colors.info('Running Pre-checks...'))
    // Check to see if sh deps are installed
    precheck()

    // Read params from cli
    program.parse(process.argv)

    const options = program.opts()

    if (!options.projectName) {
      console.log(colors.error('Error: No Project Name specified. Please include "--project-name <project-name>"'))
      sh.exit(0)
    }

    const result = getTemplate(options)

    if (result?.path && result?.replacementName && result?.repo) {
      const projectName = options.projectName
      const { path, replacementName, repo } = result

      console.log(colors.warning(`Creating project ${projectName} in ${path}`))

      animations = Array.from(Array(dupVal).keys()).map(_ => initAnimation())
      const runtime = getRuntime(options)

      sh.exec(`git clone ${repo} ${projectName}`)
      sh.cd(path)

      // Remove the .git folder
      sh.exec(`rm -rf .git`)

      // Replace all instances of template name with new project name
      sh.ls('*.*').forEach((file: string) => {
        sh.sed('-i', replacementName, projectName, file)
      })

      console.log(colors.info(`Running with ${runtime.name}`))
      // Install deps
      sh.exec(runtime.install)

      if (sh.error()) {
        sh.exec(runtime.curl)
        sh.exec(runtime.install)
      }

      sh.cd('../')

      Array.from(Array(dupVal).keys()).forEach((_, i) => clearInterval(animations[i]))

      // Print our done message
      console.log(colors.info.bold('Complete! 🎉'))
    }
  } catch (error) {
    console.error(
      colors.error(`Uh oh - Something happened, please create an issue here: \n\nhttps://github.com/lundjrl/repo-cli`),
    )

    Array.from(Array(dupVal).keys()).forEach((_, i) => clearInterval(animations[i]))
  }
}

main()
