type ActionCallback = () => void | Promise<void>;

export type Assertions = {
  shouldBeVisible: () => ActionCallback;
  shouldHaveAttribute: (
    name: string,
    value?: string | RegExp,
  ) => ActionCallback;
};

export type AssertionsNot = {
  shouldNotBeVisible: () => ActionCallback;
  shouldNotExist: () => ActionCallback;
};

export type Interactions = {
  check: () => ActionCallback;
  click: () => ActionCallback;
  type: (text: string) => ActionCallback;
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

type GoTo = (path: string, options?: GoToOptions) => ActionCallback;

type MockEndpointOptions = {
  body: string | unknown[] | Record<string | number, unknown>;
  method?: 'get' | 'post' | 'patch' | 'put' | 'delete';
  status?: number;
};

type MockEndpoint = (path: string, options: MockEndpointOptions) => void;

type FactoryOptions = {
  context: { localStorage: Storage };
  driver: Driver;
};

type Factory = (
  options: FactoryOptions,
) => void | Promise<void> | ActionCallback | ActionCallback[];

export type StepWithOptions<Options> = (options: Options) => Factory;
export type Step = () => Factory;

export type Driver = {
  findAllByText: FindAllByText;
  findByLabelText: FindByLabelText;
  findByRole: FindByRole;
  findByText: FindByText;
  goTo: GoTo;
  mockEndpoint: MockEndpoint;
  queryByText: QueryByText;
};
