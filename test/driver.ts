export type Interactions = {
  check: () => Promise<void>;
  click: () => Promise<void>;
  type: (text: string) => Promise<void>;
};

export type Assertions = {
  shouldBeVisible: () => Promise<void>;
  shouldHaveAttribute: (name: string, value?: string | RegExp) => Promise<void>;
};

export type AssertionsNot = {
  shouldNotBeVisible: () => Promise<void>;
  shouldNotExist: () => Promise<void>;
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

type MockEndpointOptions = {
  body: string | number | unknown[] | Record<string | number, unknown>;
  method?: 'get' | 'post' | 'patch' | 'put' | 'delete';
  status?: number;
};

export type MockEndpoint = (path: string, options: MockEndpointOptions) => void;

export type Precondition = ({
  mockEndpoint,
}: {
  mockEndpoint: MockEndpoint;
}) => void;

export type Prepare = (precondition: Precondition) => void;

export type Driver = {
  findAllByText: FindAllByText;
  findByLabelText: FindByLabelText;
  findByRole: FindByRole;
  findByText: FindByText;
  goTo: GoTo;
  mockEndpoint: MockEndpoint;
  prepare: Prepare;
  queryByText: QueryByText;
};

export type ItCallback = ({
  driver,
}: {
  driver: Driver;
}) => void | Promise<void>;
