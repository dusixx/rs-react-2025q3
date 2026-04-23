## Performance Profiling

<details open>
<summary><b>Without optimizations</b></summary>

[Unoptimized Source (15.4Mb)](https://github.com/dusixx/owid-co2-data/raw/refs/heads/main/unopt-src.zip)

---

##### 1. Add columns `(6x)`

```
Committed at: 1.2s
Render duration: 310.4ms
Passive effects: 36.2ms
Interactions: MainPage
```

![add columns fm](/profiling-report/unopt/add-cols-fg.jpg)
![add columns rn](/profiling-report/unopt/add-cols-rn.jpg)

##### 2. Remove columns `(6x)`

```
Committed at: 1.4s
Render duration: 478.2ms
Passive effects: 73.3ms
Interactions: MainPage
```

![remove columns fm](/profiling-report/unopt/rem-cols-fg.jpg)
![remove columns rn](/profiling-report/unopt/rem-cols-rn.jpg)

##### 3. Search by name `(query="un")`

```
Committed at: 2s
Render duration: 151.1ms
Passive effects: 7.1ms
Interactions: MainPage
```

![search fm](/profiling-report/unopt/search-un-fg.jpg)
![search rn](/profiling-report/unopt/search-un-rn.jpg)

##### 4. Sort `(by country name DESC)`

```
Committed at: 1.8s
Render duration: 366.8ms
Passive effects: 19.1ms
Interactions: MainPage
```

![sort by name fm](/profiling-report/unopt/sort-cza-fg.jpg)
![sort by name rn](/profiling-report/unopt/sort-cza-rn.jpg)

##### 5. Sort `(by population ASC)`

```
Committed at: 2s
Render duration: 351.8ms
Passive effects: 17.9ms
Interactions: MainPage
```

![sort by population fm](/profiling-report/unopt/sort-pop09-fg.jpg)
![sort by population rn](/profiling-report/unopt/sort-pop09-rn.jpg)

##### 6. Select another year

```
Committed at: 2.8s
Render duration: 363.9ms
Passive effects: 16.9ms (without highlighting cells)
Interactions: MainPage
```

![change year fm](/profiling-report/unopt/select-year-fg.jpg)
![change year rn](/profiling-report/unopt/select-year-rn.jpg)

</details>

---

<details open>
<summary><b>With optimizations</b></summary>

---

By using:

- `useMemo` [code](https://github.com/dusixx/rs-react-2025q3/blob/82bedddddab998f9403445924db6e90314afd4da/src/pages/MainPage/MainPage.tsx#L60)
- `React.memo` [code](https://github.com/dusixx/rs-react-2025q3/blob/82bedddddab998f9403445924db6e90314afd4da/src/components/Table/components/Row/Row.tsx#L22)
- `useCallback` [code](https://github.com/dusixx/rs-react-2025q3/blob/82bedddddab998f9403445924db6e90314afd4da/src/pages/MainPage/MainPage.tsx#L40)
- Proper `key` props [code](https://github.com/dusixx/rs-react-2025q3/blob/82bedddddab998f9403445924db6e90314afd4da/src/components/Table/components/Row/Row.tsx#L15)

##### 1. Add columns `(6x)`

```
Committed at: 1.1s
Render duration: 6.7ms (was 310.4ms)
Passive effects: 3ms (was 36.2ms)
Interactions: MainPage
```

![add columns fm](/profiling-report/opt/add-cols-fg.jpg)
![add columns rn](/profiling-report/opt/add-cols-rn.jpg)

##### 2. Remove columns `(6x)`

```
Committed at: 1.4s
Render duration: 5.3ms (was 478.2ms)
Passive effects: 0.8ms (was 73.3ms)
Interactions: MainPage
```

![remove columns fm](/profiling-report/opt/rem-cols-fg.jpg)
![remove columns rn](/profiling-report/opt/rem-cols-rn.jpg)

##### 3. Search by name `(query="un")`

```
Committed at: 1.8s
Render duration: 75.5ms (was 151.1ms)
Passive effects: 0.1ms (was 7.1ms)
Interactions: MainPage
```

![search fm](/profiling-report/opt/search-un-fg.jpg)
![search rn](/profiling-report/opt/search-un-rn.jpg)

##### 4. Sort `(by country name DESC)`

```
Committed at: 3.5s
Render duration: 349.6ms (was 366.8ms)
Passive effects: 0 (was 19.1ms)
Interactions: MainPage
```

![sort by name fm](/profiling-report/opt/sort-cza-fg.jpg)
![sort by name rn](/profiling-report/opt/sort-cza-rn.jpg)
![sort by name rn2](/profiling-report/opt/sort-cza-rn2.jpg)

##### 5. Sort `(by population ASC)`

```
Committed at: 2.8s
Render duration: 229.5ms (was 351.8ms)
Passive effects: 0 (was 17.9ms)
Interactions: MainPage
```

![sort by population fm](/profiling-report/opt/sort-pop09-fg.jpg)
![sort by population rn](/profiling-report/opt/sort-pop09-rn.jpg)

##### 6. Select another year

```
Committed at: 2.9s
Render duration: 298.5ms (was 363.9ms)
Passive effects: 57.7ms
Interactions: MainPage
```

![change year fm](/profiling-report/opt/select-year-fg.jpg)
![change year rn](/profiling-report/opt/select-year-rn.jpg)

</details>
