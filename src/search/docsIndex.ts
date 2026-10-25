export interface SearchRecord {
  id: string;
  title: string;
  breadcrumb: string[];
  anchor: string;
  content: string;
  path: string;
  code?: string;
}

const DOCS_PATH = '/docs.html';

// Derive search index from the same content that Docs.tsx renders
// This ensures the index stays in sync with the page
export function generateDocsIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  // Hero section
  records.push({
    id: 'hero',
    title: 'Orchestrating value across workflows and the EVM',
    breadcrumb: [],
    anchor: '',
    content: 'A practical reference for connecting Java applications through Web3j, coordinating on-chain and off-chain work with BPMN, and understanding EVM consensus, state, storage and peer-to-peer networks.',
    path: DOCS_PATH,
  });

  // Section 01: Four architectural building blocks
  records.push({
    id: 'building-blocks',
    title: 'Four architectural building blocks',
    breadcrumb: [],
    anchor: 'building-blocks',
    content: 'Keep business process coordination separate from blockchain execution and consensus. Web3j: A Java library for connecting applications to Ethereum-compatible nodes, calling contracts, encoding transactions and reading chain data. BPMN orchestration: A workflow model for sequencing tasks, handling waits and retries, applying business rules and coordinating services over time. EVM + consensus: The EVM executes compatible smart-contract bytecode. A consensus protocol helps participating validators agree on canonical blocks and ordering. State + storage: Blockchain state represents current account and contract data; transaction history and logs provide evidence of how state changed.',
    path: DOCS_PATH,
  });

  // Section 02: Reference architecture
  records.push({
    id: 'reference-architecture',
    title: 'Reference architecture',
    breadcrumb: [],
    anchor: 'reference-architecture',
    content: 'BPMN workflow engine: Business process, timers, retries, approvals, compensation and durable wait states. Java service + Web3j: Build contract calls, sign or submit transactions, query receipts, logs and contract state. EVM-compatible network: RPC endpoint, transaction pool, block proposal, consensus, EVM execution. Off-chain systems: Banking APIs, KYC/AML, ERP/POS, databases, notifications and document stores. Event + state tracking: Workflow variables, transaction hash, nonce, receipt status, block number and confirmation policy. Peer-to-peer nodes: Nodes exchange transactions and blocks; validators / clients follow the network protocol. Important boundary: BPMN does not itself create blockchain consensus, and Web3j is not a consensus engine.',
    path: DOCS_PATH,
  });

  // Section 03: Core terminology
  const terms = [
    { id: 'web3j', title: 'Web3j', desc: 'Java integration library for Ethereum JSON-RPC, ABI encoding, contract wrappers, transaction submission and event/log access.', code: 'Java → JSON-RPC → node' },
    { id: 'bpmn', title: 'BPMN', desc: 'Business Process Model and Notation: tasks, gateways, events, timers, message flows and error paths that describe a process.', code: 'Sequence · gateway · event' },
    { id: 'orchestration', title: 'Orchestration', desc: 'A central process instance controls which step runs next, records progress and manages retries, waits and compensating actions.', code: 'Process instance' },
    { id: 'off-chain', title: 'Off-chain', desc: 'Work outside the blockchain, such as identity checks, pricing, banking APIs, databases or private business data.', code: 'API · database · worker' },
    { id: 'on-chain', title: 'On-chain', desc: 'Transactions, smart-contract execution, logs and state transitions recorded or validated by the blockchain protocol.', code: 'Transaction → state transition' },
    { id: 'evm', title: 'EVM', desc: 'Ethereum Virtual Machine: deterministic execution environment for smart-contract bytecode, subject to gas and protocol rules.', code: 'Bytecode · gas · opcodes' },
    { id: 'consensus', title: 'Consensus', desc: 'Protocol by which network participants agree on block ordering and canonical chain history. Mechanisms differ by network: e.g. proof of stake or QBFT.', code: 'Ordering · validity · finality' },
    { id: 'state', title: 'State', desc: 'Current account balances, nonces, contract storage and code, as defined by a particular block. State changes through valid execution.', code: 'Account + contract state' },
    { id: 'storage', title: 'Storage', desc: 'Persistent smart-contract key/value slots. Distinct from memory (temporary during execution) and calldata (input data).', code: 'storage · memory · calldata' },
    { id: 'receipt', title: 'Transaction receipt', desc: 'Post-inclusion metadata such as status, gas used, block reference and emitted logs. A submitted hash alone does not prove success.', code: 'hash → receipt → verify status' },
    { id: 'p2p', title: 'P2P network', desc: 'Peer-to-peer communication between nodes to discover peers and exchange protocol messages, transactions and blocks.', code: 'Peers · gossip · discovery' },
    { id: 'node', title: 'Node / validator', desc: 'A node runs client software and validates or relays data. A validator has additional consensus duties where the network design requires it.', code: 'Execution client ≠ validator in every design' },
    { id: 'block', title: 'Block + finality', desc: 'A block groups ordered transactions. Finality is the protocol\'s assurance that a block will not be reverted under stated assumptions.', code: 'Inclusion ≠ immediate finality' },
    { id: 'idempotency', title: 'Idempotency', desc: 'Repeated delivery or retry should not cause the same business effect twice. Use stable business IDs and on-chain replay protections.', code: 'Idempotency key · unique operation' },
    { id: 'saga', title: 'Saga / compensation', desc: 'A sequence of local transactions with compensating business actions when later steps fail. Compensation is not a blockchain rollback.', code: 'Forward action ↔ compensation' },
    { id: 'event', title: 'Event / log', desc: 'Smart contracts emit logs that applications can query or subscribe to. Treat them as signals to verify against canonical chain data.', code: 'Event → listener → workflow' },
    { id: 'nonce', title: 'Nonce', desc: 'For an externally owned Ethereum account, a sequential transaction counter that helps enforce ordering and prevent replay of the same transaction.', code: 'Account nonce · pending tx' },
    { id: 'rpc', title: 'RPC endpoint', desc: 'An interface, commonly JSON-RPC over HTTP or WebSocket, through which an application asks a node for data or submits transactions.', code: 'eth_call · eth_sendRawTransaction' },
  ];

  terms.forEach((term) => {
    records.push({
      id: `term-${term.id}`,
      title: term.title,
      breadcrumb: ['Core terminology'],
      anchor: 'core-terminology',
      content: term.desc,
      path: DOCS_PATH,
      code: term.code,
    });
  });

  // Section 04: Token transfer lifecycle
  records.push({
    id: 'token-transfer-lifecycle',
    title: 'Example: orchestrate a token transfer',
    breadcrumb: [],
    anchor: 'token-transfer-lifecycle',
    content: 'A BPMN process can span minutes or days even though contract execution is a discrete transaction. Step 1: Start + validate. Receive transfer request. Validate wallet, business limits, identity and sanctions using off-chain services. Step 2: Prepare transaction. Java worker uses Web3j to encode contract call, estimate gas and manage signer / nonce policy. Step 3: Submit + wait. Submit signed transaction to an RPC node. Persist transaction hash and move BPMN instance to a durable wait state. Step 4: Confirm execution. Poll or consume events, retrieve receipt, check status and apply network-specific confirmation / finality policy. Step 5: Reconcile + finish. Update off-chain records idempotently. On failure, retry safely or start a defined compensation / manual review path.',
    path: DOCS_PATH,
  });

  // Section 05: Web3j flow with code
  records.push({
    id: 'web3j-flow',
    title: 'Illustrative Java + Web3j flow',
    breadcrumb: [],
    anchor: 'web3j-flow',
    content: 'Conceptual flow only — configure provider, signer and contract wrapper securely. Submit a contract method through a generated / loaded wrapper. Verify execution; a mined transaction can still fail. Persist tx hash + block reference, then reconcile business state idempotently. Production: consider async submission, receipt polling, confirmations/finality, duplicate events, reorg handling, key custody, gas and nonce coordination. The snippet is illustrative and assumes a compatible contract wrapper and APIs. In production, avoid blocking a workflow worker for long confirmation waits; persist the hash and resume the process from a message, timer or job.',
    path: DOCS_PATH,
    code: 'Web3j web3 = Web3j.build(new HttpService(rpcUrl)); TransactionReceipt receipt = tokenContract.transfer(recipient, amount).send(); if (!receipt.isStatusOK()) { throw new IllegalStateException("On-chain execution failed"); } String txHash = receipt.getTransactionHash();',
  });

  // Section 06: Reliability rules
  records.push({
    id: 'reliability-rules',
    title: 'Reliability rules of thumb',
    breadcrumb: [],
    anchor: 'reliability-rules',
    content: 'Separate responsibilities: BPMN owns business progression. Java/Web3j owns node integration. Smart contracts own on-chain invariants. Consensus belongs to the network protocol. Assume asynchronous outcomes: A successful RPC submission is not the same as inclusion, and inclusion is not always finality. Model submitted, included, confirmed, failed and replaced states explicitly. Design for duplicates: Workers retry; events may be replayed; processes may restart. Use idempotent handlers, unique operation IDs, contract-level safeguards and reconciliation. Protect keys and privacy: Keep private keys out of BPMN variables and logs. Use a signer / custody boundary. Put sensitive personal or commercial data off-chain where appropriate. Know the network model: Consensus, finality, permissioning and validator roles depend on the chosen chain. Public Ethereum and a permissioned QBFT network are not interchangeable. Make recovery explicit: Define timeout, transaction replacement, reorg, contract revert, low gas, RPC outage, manual review and compensation paths before production.',
    path: DOCS_PATH,
  });

  // Section 07: Common misconceptions
  records.push({
    id: 'common-misconceptions',
    title: 'Common misconceptions',
    breadcrumb: [],
    anchor: 'common-misconceptions',
    content: 'Does BPMN execute smart contracts? No. BPMN defines the process and invokes workers or services. A Java worker may use Web3j to interact with a node, which processes the transaction according to the chain\'s protocol. Is blockchain storage the same as transaction history? No. Contract storage is part of current world state. Transaction history, receipts and logs describe activity that led to state changes. Node implementations may prune or archive different data, so data availability should be planned. Does P2P networking equal consensus? No. P2P transports messages among nodes. Consensus rules determine how participants agree on block ordering and finality. Networking supports consensus but does not define it by itself. Can an off-chain database transaction be rolled back by the EVM? No. The database and blockchain have separate transaction boundaries. Use a saga-style process, explicit compensating actions and reconciliation to handle partial completion. Where should workflow state live? Store process progress and operational metadata in the workflow engine and supporting application store; keep the authoritative on-chain facts in the contract / chain. Persist transaction hashes and enough metadata to resume and reconcile after restarts.',
    path: DOCS_PATH,
  });

  return records;
}

// Generate the index once at module evaluation time (SSR-safe)
export const docsIndex = generateDocsIndex();
