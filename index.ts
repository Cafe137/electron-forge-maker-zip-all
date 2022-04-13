import MakerBase, { EmptyConfig, MakerOptions } from '@electron-forge/maker-base'
import { ForgePlatform } from '@electron-forge/shared-types'
import path from 'path'
import { promisify } from 'util'

export type MakerZipAllConfig = EmptyConfig

export default class MakerZIP extends MakerBase<MakerZipAllConfig> {
    name = 'zip-all'

    defaultPlatforms: ForgePlatform[] = ['darwin', 'mas', 'win32', 'linux']

    isSupportedOnCurrentPlatform(): boolean {
        return true
    }

    async make({ dir, makeDir, appName, packageJSON, targetArch, targetPlatform }: MakerOptions): Promise<string[]> {
        // eslint-disable-next-line global-require
        const { zip } = require('cross-zip')

        const zipPath = path.resolve(
            makeDir,
            'zip',
            targetPlatform,
            targetArch,
            `${path.basename(dir)}-${packageJSON.version}.zip`
        )

        await this.ensureFile(zipPath)
        await promisify(zip)(dir, zipPath)

        return [zipPath]
    }
}
