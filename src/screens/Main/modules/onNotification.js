import { DeviceService, TransactionService } from '../../../services';
import { instance } from '../../../store';
import { updateDeviceAction, updateTransactionsAction } from '../../../store/actions';

export default async({ data = {} }) => {
  const { device, wallet } = data;
  const { dispatch } = instance.get();

  if (device) await DeviceService.state().then(value => value && dispatch(updateDeviceAction(value)));

  if (wallet) {
    const transactions = await TransactionService.list({ walletId: wallet });
    if (transactions) dispatch(updateTransactionsAction(transactions));
  }
};
