/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    let prev = null;
    let curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

var node1=new ListNode(1);
var node2=new ListNode(2);
var node3=new ListNode(3);
var node4=new ListNode(4);
var node5=new ListNode(5);

node1.next=node2;
node2.next=node3;
node3.next=node4;
node4.next=node5;
node5.next=null;


function test(head){
    var copyHead = head;
    console.log("原链表：");
    while(copyHead){
        console.log(copyHead.val);
        copyHead = copyHead.next;
    }
    var res= reverseList(head);
    console.log("反转后链表：");
    while(res){
        console.log(res.val);
        res = res.next;
    }
}
test(node1);

