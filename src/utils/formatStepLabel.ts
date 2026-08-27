export const formatStepLabel = (template: string, current: number, total: number) =>
  template.replace('{{current}}', String(current)).replace('{{total}}', String(total));
