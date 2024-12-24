declare const OptionsRowTest: () => {
  Name: 'Foo',
  LayoutType: 'ShowAllInRow',
  SelectType: 'SelectMultiple',
  OneChoiceForAllPlayers: false,
  ExportOnChange: false,
  Choices: ['Option1', 'Option2'],
  LoadSelections: (self: any, list: AnyTable, pn: string) => void
  SaveSelections: () => void
}