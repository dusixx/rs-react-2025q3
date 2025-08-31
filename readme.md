## Performance Profiling

<details open>
<summary><b>After optimization</b></summary>

---

```
by using React.memo, useMemo, useCallback, proper `key` props
```

##### 1. Add columns `(6)`

```
Commited: 1.1s
Render duration: 6.7ms
Interactions: MainPage
```

![add columns fm](/profiling-report/opt/add-cols-fg.jpg)
![add columns rn](/profiling-report/opt/add-cols-rn.jpg)

##### 2. Remove columns `(6)`

```
Commited: 1.4s
Render duration: 5.3ms
Interactions: MainPage
```

![remove columns fm](/profiling-report/opt/rem-cols-fg.jpg)
![remove columns rn](/profiling-report/opt/rem-cols-rn.jpg)

##### 3. Search by name `(query="un")`

```
Commited: 1.8s
Render duration: 75.5ms
Interactions: MainPage
```

![search fm](/profiling-report/opt/search-un-fg.jpg)
![search rn](/profiling-report/opt/search-un-rn.jpg)

##### 4. Sort `(by country name DESC)`

```
Commited: 3.5s
Render duration: 349.6ms
Interactions: MainPage
```

![sort by name fm](/profiling-report/opt/sort-cza-fg.jpg)
![sort by name rn](/profiling-report/opt/sort-cza-rn.jpg)
![sort by name rn2](/profiling-report/opt/sort-cza-rn2.jpg)

##### 5. Sort `(by population ASC)`

```
Commited: 2.8s
Render duration: 229.5ms
Interactions: MainPage
```

![sort by population fm](/profiling-report/opt/sort-pop09-fg.jpg)
![sort by population rn](/profiling-report/opt/sort-pop09-rn.jpg)

##### 6. Select another year

```
Commited: 2.9s
Render duration: 298.5ms
Interactions: MainPage
```

![change year fm](/profiling-report/opt/select-year-fg.jpg)
![change year rn](/profiling-report/opt/select-year-rn.jpg)

</details>
