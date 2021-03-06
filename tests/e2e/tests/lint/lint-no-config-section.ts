import { ng } from '../../utils/process';
import { oneLine } from 'common-tags';

export default function () {
  return Promise.resolve()
    .then(() => ng('set', 'lint', '[]'))
    .then(() => ng('lint'))
    .then((output) => {
      if (!output.match(/No lint config\(s\) found\./)) {
        throw new Error(oneLine`
          Expected to match "No lint configs found."
          in ${output}.
        `);
      }

      return output;
    })
    .then((output) => {
      if (!output.match(/If this is not intended, run "ng update"\./)) {
        throw new Error(oneLine`
          Expected to match "If this is not intended, run "ng update"."
          in ${output}.
        `);
      }

      return output;
    });
}
