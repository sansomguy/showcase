# Workflows

### Workflows

A workflow is a directed graph of actions and conditions that are executed in a specific order.
| id | name | Description |

## Elements

- actions
- conditions

### Actions

Unit of work that is queued up to be performed based on the workflow conditions and the current state of the workflow.

| id  | Action | Description | Queue |
| --- | ------ | ----------- | ----- |

### Conditions

A condition is a node in the workflow that does some work to compute which of the nodes to transition to next.

| id  | Condition | Description | Passed | Failed |
| --- | --------- | ----------- | ------ | ------ |

## Instantiation
