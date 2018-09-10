---
title: activiti 表
date: 2018-09-10 20:23:21
tags: [activiti, table]
---

- ACT_RE_*: RE stands for `repository`. Tables with this prefix contain static information such as process definitions and process resources (images, rules, etc.).

- ACT_RU_*: RU stands for `runtime`. These are the runtime tables that contain the runtime data of process instances, user tasks, variables, jobs, etc. Activiti only stores the runtime data during process instance execution, and removes the records when a process instance ends. This keeps the runtime tables small and fast.

- ACT_ID_*: ID stands for `identity`. These tables contain identity information, such as users, groups, etc.

- ACT_HI_*: HI stands for `history`. These are the tables that contain historic data, such as past process instances, variables, tasks, etc.

- ACT_GE_*: general `data`, which is used in various use cases.