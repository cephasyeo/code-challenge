# using a for loop
def usingforloop(n):
    sum = 0
    for i in range(1,n+1):
        sum += i
    return sum

# using sum of arithmetic series: s = n*(n+1) / 2
def usingarithmeticsum(n):
    sum = n * (n+1) / 2
    return int(sum)

# using recursion
def sum_to_n(n):
    if n == 0:
        return 0
    else:
        return n + sum_to_n(n-1)
    
print(sum_to_n(5))