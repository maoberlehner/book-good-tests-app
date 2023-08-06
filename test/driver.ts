export type Assertions = {
  shouldBeVisible: () => Promise<void>;
  shouldHaveAttribute: (name: string, value?: string | RegExp) => Promise<void>;
};

export type AssertionsNot = {
  shouldNotBeVisible: () => Promise<void>;
  shouldNotExist: () => Promise<void>;
};

export type Interactions = {
  check: () => Promise<void>;
  click: () => Promise<void>;
  type: (text: string) => Promise<void>;
};

type FindByLabelText = (text: string) => Interactions & Assertions;

type Role = 'button' | 'link' | 'option' | 'tab';

type FindByRoleOptions = {
  name: string;
};

type FindByRole = (
  role: Role,
  options: FindByRoleOptions,
) => Interactions & Assertions;

type FindByTextOptions = {
  withinTestId?: string;
};

type FindByText = (text: string, options?: FindByTextOptions) => Assertions;

type FindAllByText = (text: string, options?: FindByTextOptions) => Assertions;

type QueryByText = (text: string, options?: FindByTextOptions) => AssertionsNot;

type GoToOptions = {
  device?: 'desktop' | 'mobile';
};

type GoTo = (path: string, options?: GoToOptions) => Promise<void>;

export type Driver = {
  findAllByText: FindAllByText;
  findByLabelText: FindByLabelText;
  findByRole: FindByRole;
  findByText: FindByText;
  goTo: GoTo;
  queryByText: QueryByText;
};
