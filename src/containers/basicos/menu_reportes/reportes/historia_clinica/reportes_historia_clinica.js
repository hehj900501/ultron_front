import 'date-fns';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Paper, Button } from '@material-ui/core';
import TableComponent from '../../../../../components/table/TableComponent';
import { ButtonCustom } from '../../../../../components/basic/ButtonCustom';
import myStyles from '../../../../../css';

export const ReportesHistoriaClinicaContainer = (props) => {

	const {
		onChangeStartDate,
		onChangeEndDate,
		startDate,
		endDate,
		onClickReportes,
		// TABLE DATES PROPERTIES
		titulo,
		columns,
		citas,
		actions,
		options,
		colorBase,
	} = props;

	const classes = myStyles(colorBase)();

	return (
		<Fragment>
			<Paper>
				<Grid container spacing={3} justify="center">
					<Grid item xs={12} sm={2}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid
								container
								justify="center"
								alignItems="center" >
								<KeyboardDatePicker
									disableToolbar
									loadingIndicator
									autoOk
									variant="inline"
									format="dd/MM/yyyy"
									margin="normal"
									id="date-picker-inline-filter"
									label="FECHA INICIAL"
									value={startDate}
									onChange={onChangeStartDate}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}} />
							</Grid>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={2}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid
								container
								justify="center"
								alignItems="center" >
								<KeyboardDatePicker
									disableToolbar
									loadingIndicator
									autoOk
									variant="inline"
									format="dd/MM/yyyy"
									margin="normal"
									id="date-picker-inline-filter"
									label="FECHA FINAL"
									value={endDate}
									onChange={onChangeEndDate}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}} />
							</Grid>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={2}>
						<ButtonCustom
							className={classes.button}
							variant="contained"
							color="primary"
							onClick={() => onClickReportes()}
							text="OBTENER DATOS" />
					</Grid>
				</Grid>
			</Paper>

			<TableComponent
				titulo={titulo}
				columns={columns}
				data={citas}
				actions={actions}
				options={options} />

		</Fragment>
	);
}
