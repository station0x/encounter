export ETH_RPC_URL=https://rpcapi-tracing.testnet.fantom.network
export ETHERSCAN_API_KEY=76GP9TIQJXSJKVAG2X7NMIFT1319KD11X9
# deploy ores
forge create ERC20 --interactive --legacy --chain fantom --constructor-args Halfinium HALF
forge create ERC20 --interactive --legacy --chain fantom --constructor-args Sangius SAN


# Halfinium
# forge create OresMinter --interactive --legacy --chain fantom --constructor-args 0x3dC1ADE4aF16CC4A3606991b2654e7629734A200 0x81FD43e82aa2D0aE59f59Ff3B999a0a6edE663E8
