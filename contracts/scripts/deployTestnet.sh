export ETH_RPC_URL=https://rpcapi-tracing.testnet.fantom.network
export ETHERSCAN_API_KEY=76GP9TIQJXSJKVAG2X7NMIFT1319KD11X9
# deploy ores

# Halfinium
forge create OresMinter --interactive --legacy --chain fantom-testnet --constructor-args 0xC6eEeeA35daB4C21388641BfF863225b94c729d2 0x79a3761e0584df2485cd07eb8969de8827298fa1
