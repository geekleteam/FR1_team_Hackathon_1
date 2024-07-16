from apis.main import bp
from server.services.boards.create_board_service import CreateBoardService

create_board_service = CreateBoardService()


@bp.route('/create_board', methods=['POST'])
def create_board(requirements):

    return create_board_service.create_board(requirements)
