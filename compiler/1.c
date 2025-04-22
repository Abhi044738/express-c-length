#include <stdio.h>
#include <string.h>

int main() {
    char name[100];  
    int length;

    int temp = scanf("%s",name);
    length = strlen(name); 

    printf("Name: %s\n", name);
    printf("Length: %d\n", length);

    return 0; 
}
