---
id: useCheckboxGroup
title: useCheckboxGroup
---

import basicUsage from '@site/static/img/guides-and-concepts/hooks/useCheckboxGroup/basic.png';

`useCheckboxGroup` hook allows you to manage an Ant Design [Checkbox.Group](https://ant.design/components/checkbox/#components-checkbox-demo-group) component when records in a resource needs to be used as checkbox options.

## Usage

We'll demonstrate how to get data at `/tags` endpoint from `https://api.fake-rest.refine.dev` REST API.

```ts title="https://api.fake-rest.refine.dev/tags"
{
    [
        {
            id: 1,
            title: "Driver Deposit",
        },
        {
            id: 2,
            title: "Index Compatible Synergistic",
        },
        {
            id: 3,
            title: "Plum",
        },
    ];
}
```

```tsx title="pages/posts/create.tsx"
import { Form, Checkbox, useCheckboxGroup } from "@pankod/refine";

import { ITag } from "interfaces";

export const PostCreate: React.FC = () => {
    //highlight-start
    const { checkboxGroupProps } = useCheckboxGroup<ITag>({
        resource: "tags",
    });
    //highlight-end

    return (
        <Form>
            ...
            <Form.Item label="Tags" name="tags">
                //highlight-next-line
                <Checkbox.Group {...checkboxGroupProps} />
            </Form.Item>
            ...
        <Form>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface ITag {
    id: string;
    title: string;
}
```

<br/>

All we have to do is pass the `checkboxGroupProps` it returns to the `<Checkbox.Group>` component.
`useCheckboxGroup` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](guides-and-concepts/hooks/data/useList.md)

<div>
    <img src={basicUsage} />
</div>

## Options

### `resource`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    //highlight-next-line
    resource: "tags",
});
```

`resource` property determines API resource endpoint to fetch records from data provider. It returns properly configured `options` values for checkboxes.

[Refer to Ant Design Checkbox.Group component documentation for detailed info for `options`. &#8594](https://ant.design/components/checkbox)

### `optionLabel` and `optionValue`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    //highlight-start
    optionLabel: "title",
    optionValue: "id",
    //highlight-end
});
```

Allows you to change the values and appearance of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

### `filters`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    //highlight-start
    filters: [
        {
            field: "title",
            operator: "eq",
            value: "Driver Deposit",
        },
    ],
    //highlight-end
});
```

It allows us to add some filters while fetching the data. For example, if you want to list only `title`'s equal to `"Driver Deposit"` records.

### `sort`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    //highlight-start
    sort: [
        {
            field: "title",
            order: "asc",
        },
    ],
    //highlight-end
});
```

It allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending.

## API Reference

### Properties

| Property                                          | Description                               | Type                                       | Default   |
| ------------------------------------------------- | ----------------------------------------- | ------------------------------------------ | --------- |
| resource <div className="required">Required</div> | [`Resource`](#) for API data interactions | `string`                                   |           |
| optionValue                                       | Set the option's value                    | `string`                                   | `"id"`    |
| optionLabel                                       | Set the option's label value              | `string`                                   | `"title"` |
| filters                                           | Add filters while fetching the data       | [`CrudFilters`](interfaces.md#crudfilters) |           |
| sort                                              | Allow us to sort the options              | [`CrudSorting`](interfaces.md#crudsorting) |           |

### Return values

| Property           | Description                     | Type                                                                                          |
| ------------------ | ------------------------------- | --------------------------------------------------------------------------------------------- |
| checkboxGroupProps | Ant design checkbox group props | [`Checkbox Group`](https://ant.design/components/checkbox/#Checkbox-Group)                    |
| queryResult        | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |